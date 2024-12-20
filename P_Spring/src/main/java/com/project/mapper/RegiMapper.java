package com.project.mapper;

import java.util.ArrayList;

import com.project.dto.RegisterDto;

public interface RegiMapper {
    public void setRegisterMember(RegisterDto register_dto);
    public void setRegisterEmployee(RegisterDto register_dto);
    public ArrayList<RegisterDto> pullId();
}
