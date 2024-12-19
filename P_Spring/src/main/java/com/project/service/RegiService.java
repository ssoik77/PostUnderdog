package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.MemberDto;
import com.project.mapper.RegiMapper;

@Service
public class RegiService {

    @Autowired
    private RegiMapper regiMapper;

    public String registerMember(MemberDto memberDto) {
        // 디버깅용 로그
        System.out.println("Registering password: " + memberDto.getM_pw());
        regiMapper.insertMember(memberDto);
        return "회원 가입이 완료되었습니다.";
    }
}
