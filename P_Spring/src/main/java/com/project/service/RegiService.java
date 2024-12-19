package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.RegiMapper;

import lombok.Setter;

@Service
public class RegiService {

	@Setter(onMethod_ = @Autowired)
	private RegiMapper mapper;

	public void tel(String m_tel) {
		mapper.tel(m_tel);
	}
}
