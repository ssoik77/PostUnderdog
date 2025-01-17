package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.VacationDto;
import com.project.mapper.VacationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationService {

    private final VacationMapper vacationMapper;

    // 새로운 휴가 신청 생성
    public VacationDto createVacation(VacationDto vacationDto) {
        vacationMapper.insertVacation(vacationDto);
        return vacationMapper.getVacationById(vacationDto.getVacationId());
    }

    // 특정 사용자 휴가 신청 목록 조회	
    public List<VacationDto> getVacationsByMemberId(String mId) {
        return vacationMapper.selectVacationsByMemberId(mId);
    }

    // 휴가 신청 삭제
    public void deleteVacation(Long id, String userId) {
        VacationDto vacation = vacationMapper.getVacationById(id);
        if (vacation != null && vacation.getMId().equals(userId)) {
            vacationMapper.deleteVacationById(id);
        } else {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }
    }

    // 휴가 신청 수정
    public void updateVacation(Long id, VacationDto vacationDto, String userId) {
        VacationDto existingVacation = vacationMapper.getVacationById(id);
        if (existingVacation != null && existingVacation.getMId().equals(userId)) {
            vacationDto.setVacationId(id); // 업데이트할 ID 설정
            vacationMapper.updateVacation(vacationDto);
        } else {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }
    }
}