package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.DispatchDto;
import com.project.mapper.DispatchMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DispatchService {
	
	private final DispatchMapper dispatchMapper;

    public DispatchDto createDispatch(DispatchDto dispatchDto) {
        dispatchMapper.insertDispatch(dispatchDto);
        return dispatchMapper.getDispatchById(dispatchDto.getDispatch_id());
    }

    public List<DispatchDto> getDispatchsByMemberId(String mId) {
        return dispatchMapper.selectDispatchsByMemberId(mId);
    }
    
    public List<DispatchDto> getSelectDispatchs(String teamName) {
    	
    	return dispatchMapper.selectTeamDispatchs(teamName);
    }
    
    public List<DispatchDto> getAllDispatchs() {
        return dispatchMapper.selectAllDispatchs();
    }


    public void deleteDispatch(Long id, String userId) {
        DispatchDto dispatch = dispatchMapper.getDispatchById(id);
        if (dispatch != null && dispatch.getM_id().equals(userId)) {
            dispatchMapper.deleteDispatchById(id);
        } else {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }
    }

    public void updateDispatch(Long id, DispatchDto dispatchDto, String userId) {
        DispatchDto existingDispatch = dispatchMapper.getDispatchById(id);
        if (existingDispatch != null && existingDispatch.getM_id().equals(userId)) {
            dispatchDto.setDispatch_id(id);
            dispatchMapper.updateDispatch(dispatchDto);
        } else {
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }
    }
    
}
