package com.project.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.DispatchDto;
import com.project.dto.RegisterDto;
import com.project.service.DispatchService;
import com.project.service.VacationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dispatch")
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.0.135:3000"})
@RequiredArgsConstructor
public class DispatchController {
	
	 private static final Logger logger = LoggerFactory.getLogger(DispatchController.class);
	    private final DispatchService dispatchService;

	    // 휴가 신청
	    @PostMapping
	    public ResponseEntity<String> createDispatch(@RequestBody DispatchDto dispatchDto) {
	        logger.info("휴가 신청 요청: {}", dispatchDto);

	        if (dispatchDto.getM_id() == null || dispatchDto.getE_name() == null) {
	            logger.warn("사용자 정보가 필요합니다.");
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
	        }
	        	logger.info("eKey"+ dispatchDto.getE_key());

	        	dispatchService.createDispatch(dispatchDto);
	        logger.info("휴가 신청 완료: 사용자 ID: {}, 이름: {}", dispatchDto.getM_id(), dispatchDto.getE_name());
	        return ResponseEntity.ok("휴가 신청이 완료되었습니다.");
	    }

	    // 휴가 신청 목록
	    @PostMapping("/list")
	    public ResponseEntity<List<DispatchDto>> getMyDispatchs(@RequestBody RegisterDto registerDto) {
	        logger.info("휴가 목록 조회 요청: {}", registerDto);
	        String userId = registerDto.getM_id();

	        if (userId == null || userId.trim().isEmpty()) {
	            logger.warn("사용자 정보가 필요합니다.");
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	        }

	        List<DispatchDto> dispatchs = dispatchService.getDispatchsByMemberId(userId);
	        logger.info("휴가 목록 조회 성공: 사용자 ID: {}, 조회된 휴가 수: {}", userId, dispatchs.size());
	        return ResponseEntity.ok(dispatchs);
	    }

	    // 휴가 팀 목록
	    @PostMapping("/select/list")
	    public ResponseEntity<List<DispatchDto>> getSelectDispatchs(@RequestBody String teamName) {
	    	logger.info(teamName);	
	    	List<DispatchDto> dispatchs = dispatchService.getSelectDispatchs(teamName);
	    	logger.info("선택 휴가 목록 조회 성공: 조회된 휴가 수: {}", dispatchs.size());	
	    	return ResponseEntity.ok(dispatchs);
	    }
	    
	    // 휴가 전체 목록
	    @PostMapping("/listAll")
	    public ResponseEntity<List<DispatchDto>> getAllDispatchs() {
	        List<DispatchDto> dispatchs = dispatchService.getAllDispatchs();
	        logger.info("전체 휴가 목록 조회 성공: 조회된 휴가 수: {}", dispatchs.size());
	        return ResponseEntity.ok(dispatchs);
	    }

	    // 휴가 삭제
	    @DeleteMapping("/{dispatchId}")
	    public ResponseEntity<String> deleteDispatch(
	            @PathVariable Long dispatchId, 
	            @RequestParam("m_id") String userId) {

	        logger.info("삭제 요청 - dispatchId: {}", dispatchId);
	        logger.info("요청된 사용자 ID (m_id): {}", userId);

	        if (userId == null || userId.trim().isEmpty()) {
	            logger.warn("사용자 정보가 필요합니다.");
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
	        }

	        try {
	        	dispatchService.deleteDispatch(dispatchId, userId);
	            logger.info("휴가 신청 삭제 성공: {}", dispatchId);
	            return ResponseEntity.ok("휴가 신청이 삭제되었습니다.");
	        } catch (IllegalArgumentException e) {
	            logger.error("휴가 삭제 실패: {}", e.getMessage());
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
	        }
	    }

	    // 휴가 수정
	    @PutMapping("/{dispatchId}")
	    public ResponseEntity<String> updateDispatch(
	            @PathVariable Long dispatchId,
	            @RequestBody DispatchDto dispatchDto) {

	        logger.info("휴가 수정 요청: 휴가 ID: {}, 수정 데이터: {}", dispatchId, dispatchDto);
	        String userId = dispatchDto.getM_id();

	        if (userId == null || userId.trim().isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
	        }
	        
	        dispatchDto.setDispatch_complete(0);
	        try {
	        	dispatchService.updateDispatch(dispatchId, dispatchDto, userId);
	            logger.info("휴가 수정 성공: 휴가 ID: {}, 사용자 ID: {}", dispatchId, userId);
	            return ResponseEntity.ok("휴가 신청이 수정되었습니다.");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
	        }
	    }


}
