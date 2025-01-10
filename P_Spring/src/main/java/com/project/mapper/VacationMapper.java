package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.dto.VacationDto;

@Mapper
public interface VacationMapper {
    // 모든 휴가 조회
    List<VacationDto> getAllVacations();

    // 특정 휴가 조회
    VacationDto getVacationById(@Param("vacationId") Long vacationId);

    // 휴가 신청
    void insertVacation(VacationDto vacation);

    // 휴가 수정
    void updateVacation(VacationDto vacation);

    // 휴가 삭제
    void deleteVacation(@Param("vacationId") Long vacationId);
}
