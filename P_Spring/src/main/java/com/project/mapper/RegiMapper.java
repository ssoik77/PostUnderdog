package com.project.mapper;

import java.util.ArrayList;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;

public interface RegiMapper {
	public EmployeeDto checkRegister(String num);
	public void setRegisterEmployee(RegisterDto register_dto);
    public int pullKey(RegisterDto register_dto);
    public void setRegisterMember(RegisterDto register_dto);
    public ArrayList<RegisterDto> pullId();
}
