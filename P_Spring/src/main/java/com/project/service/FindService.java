package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.project.dto.RegisterDto;
import com.project.mapper.FindMapper;

import lombok.Setter;

@Service
public class FindService {

	@Setter(onMethod_ = @Autowired)
	private FindMapper findMapper;

	public String pwFind(RegisterDto registerDto) {
		return findMapper.pwFind(registerDto);
=======
import com.project.mapper.FindMapper;

@Service
public class FindService {

	@Autowired
	private FindMapper findMapper; // Mapper 연결

	// 사용자 정보를 기준으로 비밀번호를 반환하는 서비스 메소드
	public String findPassword(String e_name, String e_birthdate, String e_tel_num) {
		// Mapper를 통해 데이터베이스에서 정보를 가져옴
		return findMapper.getPasswordByInfo(e_name, e_birthdate, e_tel_num);
>>>>>>> 7c3a438c7d31201220158dcbfad847082ea8784e
	}
}
