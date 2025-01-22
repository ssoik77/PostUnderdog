package com.project.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;

@Service
public class RegiService {

    @Setter(onMethod_=@Autowired)
    private RegiMapper regi_mapper;

    @Transactional
    public void setRegister(RegisterDto register_dto) {
        // 1. 직원 정보 삽입 (e_key 생성)
        regi_mapper.setRegisterEmployee(register_dto);

        // 2. 생성된 e_key를 RegisterDto에 설정한 후, 회원 정보 삽입
        Integer eKey = register_dto.getE_key();
        if (eKey == null) {
            throw new IllegalStateException("직원 정보 삽입 후 e_key가 생성되지 않았습니다.");
        }
        register_dto.setE_key(eKey);

        // 3. 회원 정보 삽입 (e_key 사용)
        regi_mapper.setRegisterMember(register_dto);
    }

    public String checkId(String take_id) {
        String id = take_id;
        ArrayList<RegisterDto> m_id_list = regi_mapper.pullId();
        String message = "사용 가능한 아이디입니다.";
        for (RegisterDto compare_id : m_id_list) {
            if (compare_id.getM_id().equals(id)) {
                message = "이미 등록되어 있는 아이디입니다.";
                break;
            }
        }
        return message;
    }
}
