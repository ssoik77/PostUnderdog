package com.project.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

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
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.VacationDto;
import com.project.service.VacationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/vacations")
@RequiredArgsConstructor
public class VacationController {

    private final VacationService vacationService;

    @PostMapping
    public ResponseEntity<String> createVacation(@RequestBody VacationDto vacationDto, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        String userName = (String) session.getAttribute("userName");

        if (userId == null || userName == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        vacationDto.setMId(userId);
        vacationDto.setEName(userName);

        vacationService.createVacation(vacationDto);
        return ResponseEntity.ok("휴가 신청이 완료되었습니다.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<VacationDto>> getMyVacations(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<VacationDto> vacations = vacationService.getVacationsByMemberId(userId);
        return ResponseEntity.ok(vacations);
    }

    @DeleteMapping("/{vacationId}")
    public ResponseEntity<String> deleteVacation(@PathVariable Long vacationId, HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            vacationService.deleteVacation(vacationId, userId);
            return ResponseEntity.ok("휴가 신청이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    
    @PutMapping("/{vacationId}")
    public ResponseEntity<String> updateVacation(
        @PathVariable Long vacationId,
        @RequestBody VacationDto vacationDto,
        HttpSession session
    ) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            vacationService.updateVacation(vacationId, vacationDto, userId);
            return ResponseEntity.ok("휴가 신청이 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}