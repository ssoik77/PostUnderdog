package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.RegisterDto;
import com.project.mapper.FindMapper;

import lombok.Setter;

@Service
public class FindService {

	@Setter(onMethod_ = @Autowired)
	private FindMapper findMapper;

	public String pwFind(RegisterDto registerDto) {
		return findMapper.pwFind(registerDto);
	}
}
