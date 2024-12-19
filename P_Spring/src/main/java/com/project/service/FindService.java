package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.FindMapper;

@Service
public class FindService {

	@Autowired
	private FindMapper findMapper; // Mapper 연결

	// 사용자 정보를 기준으로 비밀번호를 반환하는 서비스 메소드
	public String findPassword(String e_name, String e_birthdate, String e_tel_num) {
		// Mapper를 통해 데이터베이스에서 정보를 가져옴
		return findMapper.getPasswordByInfo(e_name, e_birthdate, e_tel_num);
	}
}
