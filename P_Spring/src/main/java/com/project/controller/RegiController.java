package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.service.RegiService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/register/*")
public class RegiController {

	@Setter(onMethod_ = @Autowired)
	private RegiService service;

	@PostMapping("/tel")
	public void tel(@RequestParam("m_tel") String m_tel) {
		System.out.println("전화번호:" + m_tel);
		service.tel(m_tel);
	}
}
