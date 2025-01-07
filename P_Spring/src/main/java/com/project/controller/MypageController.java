package com.project.controller;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.service.MypageService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/mypage")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j
public class MypageController {

    private final MypageService mypageService;
    
    public MypageController(MypageService mypageService) {
        this.mypageService = mypageService;
    }

    @GetMapping("/userinfo")
    public Map<String, Object> getUserInfo(@RequestParam String m_id) {
        Map<String, Object> response = new HashMap<>();
        log.info("wlsdlq: " + m_id);

        try {
            MemberDto memberInfo = mypageService.getMemberInfo(m_id);
            if (memberInfo == null) {
                response.put("status", "failure");
                response.put("message", "회원 정보를 찾을 수 없습니다.");
                return response;
            }

            EmployeeDto employeeInfo = mypageService.getEmployeeInfo(memberInfo.getM_key());
            if (employeeInfo == null) {
                response.put("status", "failure");
                response.put("message", "직원 정보를 찾을 수 없습니다.");
                return response;
            }

            response.put("status", "success");
            response.put("memberInfo", memberInfo);
            response.put("employeeInfo", employeeInfo);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("message", "서버 에러가 발생했습니다.");
            e.printStackTrace();
        }

        return response;
    }

    @PostMapping("/updateInfo")
    public Map<String, String> updateUserInfo(@RequestBody Map<String, Object> updateData) {
        Map<String, String> response = new HashMap<>();
        try {
            MemberDto member = new MemberDto();
            member.setM_id((String) updateData.get("m_id"));
            member.setM_pw((String) updateData.get("m_pw"));
            member.setA_authority((Boolean) updateData.get("a_authority"));
            member.setP_authority((Boolean) updateData.get("p_authority"));
            member.setE_authority((Boolean) updateData.get("e_authority"));

            EmployeeDto employee = new EmployeeDto();
            employee.setE_name((String) updateData.get("e_name"));
            employee.setE_birth(Date.valueOf((String) updateData.get("e_birth")));
            employee.setE_carrier((String) updateData.get("e_carrier"));
            employee.setE_tel_num((String) updateData.get("e_tel_num"));
            employee.setM_key((Integer) updateData.get("m_key"));

            mypageService.updateMemberInfo(member);
            mypageService.updateEmployeeInfo(employee);

            response.put("status", "success");
        } catch (Exception e) {
            response.put("status", "failure");
            e.printStackTrace();
        }
        return response;
    }
}