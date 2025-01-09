package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.dto.VacationDto;
import com.project.service.VacationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vacations")
public class VacationController {

    @Autowired
    private VacationService vacationService;

    // 가정: 로그인된 사용자 정보를 주입받음
    @Autowired
    private MemberDto loggedInMember;

    @Autowired
    private EmployeeDto loggedInEmployee;

    @GetMapping
    public List<VacationDto> getAllVacations() {
        return vacationService.getAllVacations();
    }

    @GetMapping("/{id}")
    public VacationDto getVacationById(@PathVariable Long id) {
        return vacationService.getVacationById(id);
    }

    @PostMapping
    public void createVacation(@RequestBody VacationDto vacation) {
        vacation.setEmployeeId(loggedInMember.getM_id());
        vacation.setEmployeeName(loggedInEmployee.getE_name());
        vacationService.createVacation(vacation);
    }

    @PutMapping("/{id}")
    public void updateVacation(@PathVariable Long id, @RequestBody VacationDto vacation) {
        vacation.setVacationId(id);
        vacationService.updateVacation(vacation);
    }

    @DeleteMapping("/{id}")
    public void deleteVacation(@PathVariable Long id) {
        vacationService.deleteVacation(id);
    }
}
