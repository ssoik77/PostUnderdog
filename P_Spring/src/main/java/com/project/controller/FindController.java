package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.FindService;

import lombok.Setter;

@RestController
@RequestMapping("/find/*")
public class FindController {

	@Setter(onMethod_ = @Autowired)
	private FindService findService;

	// 비밀번호 찾기 요청 처리
	@GetMapping("/password")
	public ResponseEntity<String> getPassword(@RequestParam String m_id, @RequestParam Date e_birth,
			@RequestParam String e_tel_num) {

		RegisterDto registerDto = new RegisterDto(m_id, e_birth, e_tel_num);
		String password = findService.pwFind(registerDto);

		if (password != null) {
			return ResponseEntity.ok(password);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
		}
	}
}
