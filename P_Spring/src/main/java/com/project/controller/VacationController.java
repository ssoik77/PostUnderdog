package com.project.controller;

import java.util.List;

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

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/vacations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Log4j
public class VacationController {

    private final VacationService vacationService;

    public VacationController(VacationService vacationService) {
        this.vacationService = vacationService;
    }

    @GetMapping
    public ResponseEntity<List<VacationDto>> getAllVacations() {
        List<VacationDto> vacations = vacationService.getAllVacations();
        return ResponseEntity.ok(vacations);
    }

    @PostMapping
    public ResponseEntity<Void> createVacation(@RequestBody VacationDto vacationDto) {
        vacationService.createVacation(vacationDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateVacation(@PathVariable("id") Long vacationId, @RequestBody VacationDto vacationDto) {
        vacationDto.setVacationId(vacationId);
        vacationService.updateVacation(vacationDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacation(@PathVariable("id") Long vacationId) {
        vacationService.deleteVacation(vacationId);
        return ResponseEntity.noContent().build();
    }
}
