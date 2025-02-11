package com.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.VacationApprovalDto;
import com.project.dto.VacationDto;
import com.project.mapper.VacationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacationService {

    private final VacationMapper vacationMapper;

    public VacationDto createVacation(VacationDto vacationDto) {
        vacationMapper.insertVacation(vacationDto);
        return vacationMapper.getVacationById(vacationDto.getVacationId());
    }

    public List<VacationDto> getVacationsByMemberId(String mId) {
        return vacationMapper.selectVacationsByMemberId(mId);
    }
    
    public List<VacationDto> getAllVacations() {
        return vacationMapper.selectAllVacations();
    }


    public void deleteVacation(Long id, String userId) {
        VacationDto vacation = vacationMapper.getVacationById(id);
        if (vacation != null && vacation.getMId().equals(userId)) {
            vacationMapper.deleteVacationById(id);
        } else {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }
    }

    public void updateVacation(Long id, VacationDto vacationDto, String userId) {
        VacationDto existingVacation = vacationMapper.getVacationById(id);
        if (existingVacation != null && existingVacation.getMId().equals(userId)) {
            vacationDto.setVacationId(id);
            vacationMapper.updateVacation(vacationDto);
        } else {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }
    }
    
    public int pageCount() {
        int vacationCount = vacationMapper.vacationCount();
        int allPageCount = vacationCount / 10;
        if (vacationCount % 10 > 0) {
            allPageCount += 1;
        }
        return allPageCount;
    }
    
    public ArrayList<VacationApprovalDto> pageList(int pageNoInPage) {
        return vacationMapper.pageList(pageNoInPage);
    }
    
    public void approvalVacation(Long vacationId, int approval) {
        // userId 검증 없이 단순 업데이트를 수행
        int updatedCount = vacationMapper.updateVacationApproval(vacationId, approval);
        if (updatedCount == 0) {
            throw new IllegalArgumentException("휴가 승인 처리 실패");
        }
    }
}