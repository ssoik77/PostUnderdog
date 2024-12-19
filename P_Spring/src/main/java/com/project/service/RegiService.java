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
        regiMapper.insertMember(memberDto); // DB에 회원 정보 저장 (암호화하지 않음)
        return "회원 가입이 완료되었습니다.";
    }
}
