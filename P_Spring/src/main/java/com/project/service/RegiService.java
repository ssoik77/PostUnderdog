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
        regiMapper.insertMember(memberDto); // DB�� ȸ�� ���� ���� (��ȣȭ���� ����)
        return "ȸ�� ������ �Ϸ�Ǿ����ϴ�.";
    }
}
