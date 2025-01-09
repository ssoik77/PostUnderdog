package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.VacationDto;
import com.project.mapper.VacationMapper;

@Service
public class VacationService {

    @Autowired
    private VacationMapper vacationMapper;

    public List<VacationDto> getAllVacations() {
        return vacationMapper.getAllVacations();
    }

    public VacationDto getVacationById(Long vacationId) {
        return vacationMapper.getVacationById(vacationId);
    }

    public void createVacation(VacationDto vacation) {
        vacationMapper.insertVacation(vacation);
    }

    public void updateVacation(VacationDto vacation) {
        vacationMapper.updateVacation(vacation);
    }

    public void deleteVacation(Long vacationId) {
        vacationMapper.deleteVacation(vacationId);
    }
}
