package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.dto.DispatchDto;
@Mapper

public interface DispatchMapper {
	 // 특정 사용자의 휴가 신청 목록 조회
    List<DispatchDto> selectDispatchsByMemberId(@Param("mId") String mId);

    // 새로운 휴가 신청 추가
    void insertDispatch(DispatchDto dispatchDto);

    // 휴가 신청 ID로 조회
    DispatchDto getDispatchById(@Param("dispatchId") Long dispatchId);

    // 휴가 신청 삭제
    void deleteDispatchById(@Param("dispatchId") Long dispatchId);

    // 휴가 신청 수정
    void updateDispatch(DispatchDto dispatchDto);
    
    // 휴가 신청 전체 갯 수
    int dispatchCount();
    
    // 휴가 승인 업데이트 (approval 칼럼 업데이트)
    int updateDispatchApproval(@Param("dispatchId") Long dispatchId, 
                               @Param("approval") int approval);
    
    List<DispatchDto> selectTeamDispatchs(String teamName);
    
    List<DispatchDto> selectAllDispatchs();
}
