package com.project.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.project.dto.RegisterDto;

@Mapper
public interface RegiMapper {
	public void setRegisterMember(RegisterDto register_dto);
	public void setRegisterEmployee(RegisterDto register_dto);
}
