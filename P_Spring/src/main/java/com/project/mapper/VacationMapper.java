package com.project.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.dto.VacationApprovalDto;
import com.project.dto.VacationDto;

@Mapper
public interface VacationMapper {
    // 특정 사용자의 휴가 신청 목록 조회
    List<VacationDto> selectVacationsByMemberId(@Param("mId") String mId);

    // 새로운 휴가 신청 추가
    void insertVacation(VacationDto vacationDto);

    // 휴가 신청 ID로 조회
    VacationDto getVacationById(@Param("vacationId") Long vacationId);

    // 휴가 신청 삭제
    void deleteVacationById(@Param("vacationId") Long vacationId);

    // 휴가 신청 수정
    void updateVacation(VacationDto vacationDto);
    
    // 휴가 신청 전체 갯 수
    int vacationCount();
    
    // 휴가 신청 리스트
    ArrayList<VacationApprovalDto> pageList(int no);
    
    // 휴가 승인 업데이트 (approval 칼럼 업데이트)
    int updateVacationApproval(@Param("vacationId") Long vacationId, 
                               @Param("approval") int approval);
    
    List<VacationDto> selectAllVacations();

}
