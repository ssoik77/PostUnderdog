package com.project.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

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

import com.project.dto.VacationApprovalDto;
import com.project.dto.VacationDto;
import com.project.service.VacationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/vacations")
@RequiredArgsConstructor
public class VacationController {

    private static final Logger logger = LoggerFactory.getLogger(VacationController.class);
    private final VacationService vacationService;

    @PostMapping
    public ResponseEntity<String> createVacation(@RequestBody VacationDto vacationDto, HttpSession session) {
        logger.info("휴가 신청 요청: {}", vacationDto);

        String userId = (String) session.getAttribute("userId");
        String userName = (String) session.getAttribute("userName");

        if (userId == null || userName == null) {
            logger.warn("로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        vacationDto.setMId(userId);
        vacationDto.setEName(userName);

        vacationService.createVacation(vacationDto);
        logger.info("휴가 신청 완료: 사용자 ID: {}, 이름: {}", userId, userName);

        return ResponseEntity.ok("휴가 신청이 완료되었습니다.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<VacationDto>> getMyVacations(HttpSession session) {
        logger.info("휴가 목록 조회 요청");

        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            logger.warn("로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<VacationDto> vacations = vacationService.getVacationsByMemberId(userId);
        logger.info("휴가 목록 조회 성공: 사용자 ID: {}, 조회된 휴가 수: {}", userId, vacations.size());

        return ResponseEntity.ok(vacations);
    }

    @DeleteMapping("/{vacationId}")
    public ResponseEntity<String> deleteVacation(@PathVariable Long vacationId, HttpSession session) {
        logger.info("휴가 삭제 요청: 휴가 ID: {}", vacationId);

        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            logger.warn("로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            vacationService.deleteVacation(vacationId, userId);
            logger.info("휴가 삭제 성공: 휴가 ID: {}, 사용자 ID: {}", vacationId, userId);
            return ResponseEntity.ok("휴가 신청이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            logger.error("휴가 삭제 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PutMapping("/{vacationId}")
    public ResponseEntity<String> updateVacation(
        @PathVariable Long vacationId,
        @RequestBody VacationDto vacationDto,
        HttpSession session
    ) {
        logger.info("휴가 수정 요청: 휴가 ID: {}, 수정 데이터: {}", vacationId, vacationDto);

        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            logger.warn("로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            vacationService.updateVacation(vacationId, vacationDto, userId);
            logger.info("휴가 수정 성공: 휴가 ID: {}, 사용자 ID: {}", vacationId, userId);
            return ResponseEntity.ok("휴가 신청이 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            logger.error("휴가 수정 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    
    
    @GetMapping("/pagecount")
    @ResponseBody
    int pageCount() {
    	return vacationService.pageCount();
    }
    
    @GetMapping("/approval")
    @ResponseBody
    ArrayList<VacationApprovalDto> vacationApproval(@RequestParam("no") int pageNo) {
    	int pageNoInPage = ((pageNo-1) * 10);
    	ArrayList<VacationApprovalDto> list = vacationService.pageList(pageNoInPage);
    	return list;
    }
}
