package com.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.dto.VacationApprovalDto;
import com.project.dto.VacationDto;
import com.project.service.VacationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.0.135:3000"}, allowCredentials = "true")
@RequestMapping("/vacations")
@RequiredArgsConstructor
public class VacationController {

    private static final Logger logger = LoggerFactory.getLogger(VacationController.class);
    private final VacationService vacationService;

    // 휴가 신청
    @PostMapping
    public ResponseEntity<String> createVacation(@RequestBody VacationDto vacationDto) {
        logger.info("휴가 신청 요청: {}", vacationDto);

        if (vacationDto.getMId() == null || vacationDto.getEName() == null) {
            logger.warn("사용자 정보가 필요합니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
        }

        vacationService.createVacation(vacationDto);
        logger.info("휴가 신청 완료: 사용자 ID: {}, 이름: {}", vacationDto.getMId(), vacationDto.getEName());
        return ResponseEntity.ok("휴가 신청이 완료되었습니다.");
    }

    // 휴가 신청 목록
    @PostMapping("/list")
    public ResponseEntity<List<VacationDto>> getMyVacations(@RequestBody RegisterDto registerDto) {
        logger.info("휴가 목록 조회 요청: {}", registerDto);
        String userId = registerDto.getM_id();

        if (userId == null || userId.trim().isEmpty()) {
            logger.warn("사용자 정보가 필요합니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        List<VacationDto> vacations = vacationService.getVacationsByMemberId(userId);
        logger.info("휴가 목록 조회 성공: 사용자 ID: {}, 조회된 휴가 수: {}", userId, vacations.size());
        return ResponseEntity.ok(vacations);
    }

    // 휴가 전체 목록
    @PostMapping("/listAll")
    public ResponseEntity<List<VacationDto>> getAllVacations() {
        List<VacationDto> vacations = vacationService.getAllVacations();
        logger.info("전체 휴가 목록 조회 성공: 조회된 휴가 수: {}", vacations.size());
        return ResponseEntity.ok(vacations);
    }

    // 휴가 삭제
    @DeleteMapping("/{vacationId}")
    public ResponseEntity<String> deleteVacation(
            @PathVariable Long vacationId, 
            @RequestParam("m_id") String userId) {

        logger.info("삭제 요청 - vacationId: {}", vacationId);
        logger.info("요청된 사용자 ID (m_id): {}", userId);

        if (userId == null || userId.trim().isEmpty()) {
            logger.warn("사용자 정보가 필요합니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
        }

        try {
            vacationService.deleteVacation(vacationId, userId);
            logger.info("휴가 신청 삭제 성공: {}", vacationId);
            return ResponseEntity.ok("휴가 신청이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            logger.error("휴가 삭제 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    // 휴가 수정
    @PutMapping("/{vacationId}")
    public ResponseEntity<String> updateVacation(
            @PathVariable Long vacationId,
            @RequestBody VacationDto vacationDto) {

        logger.info("휴가 수정 요청: 휴가 ID: {}, 수정 데이터: {}", vacationId, vacationDto);
        String userId = vacationDto.getMId();

        if (userId == null || userId.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
        }

        try {
            vacationService.updateVacation(vacationId, vacationDto, userId);
            logger.info("휴가 수정 성공: 휴가 ID: {}, 사용자 ID: {}", vacationId, userId);
            return ResponseEntity.ok("휴가 신청이 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    // 휴가 승인
    @PutMapping("/approval/{vacationId}")
    public ResponseEntity<String> approveVacation(
            @PathVariable Long vacationId,
            @RequestBody Map<String, Object> body) {

        logger.info("휴가 승인 요청: 휴가 ID: {}, 데이터: {}", vacationId, body);

        String userId = (String) body.get("m_id");
        if (userId == null || userId.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보가 필요합니다.");
        }

        int approval = (int) body.get("approval");
        try {
            vacationService.approvalVacation(vacationId, approval);
            logger.info("휴가 승인 성공: 휴가 ID: {}, 승인 상태: {}", vacationId, approval);
            return ResponseEntity.ok("휴가 승인 처리 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    // 휴가 승인 목록 페이징
    @GetMapping("/pagecount")
    @ResponseBody
    public int pageCount() {
        return vacationService.pageCount();
    }
    
    // 휴가 승인 목록
    @GetMapping("/approval")
    @ResponseBody
    public ArrayList<VacationApprovalDto> vacationApproval(@RequestParam("no") int pageNo) {
        int pageNoInPage = ((pageNo - 1) * 10);
        return vacationService.pageList(pageNoInPage);
    }
}
