package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.dto.VacationDto;

@Mapper
public interface VacationMapper {
    List<VacationDto> getAllVacations();
    VacationDto getVacationById(@Param("vacationId") Long vacationId);
    void insertVacation(VacationDto vacation);
    void updateVacation(VacationDto vacation);
    void deleteVacation(@Param("vacationId") Long vacationId);
}
