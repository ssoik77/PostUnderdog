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

    public void createVacation(VacationDto vacation) {
        vacationMapper.insertVacation(vacation);
    }

    public void updateVacation(VacationDto vacation) {
        vacationMapper.updateVacation(vacation); // Mapper 호출
    }

    public void deleteVacation(Long vacationId) {
        vacationMapper.deleteVacation(vacationId); // Mapper 호출
    }
}
