package com.project.controller;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.RegiService;

import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = {"http://localhost:3000","http://192.168.0.135:3000"}) // React와의 CORS 허용
@RestController
@RequestMapping(value = "/register/*")
@Log4j
public class RegiController {

    private final RegiService regiService;

    public RegiController(RegiService regiService) {
        this.regiService = regiService;
    }

    @PostMapping("/set")
    @Transactional
    @ResponseBody
    public String setRegister(@RequestBody RegisterDto registerDto) {
        String result = regiService.setRegister(registerDto);
        return result;
    }


    @PostMapping("/id/check")
    @ResponseBody
    public String checkId(@RequestBody RegisterDto registerDto) {
    	log.info("진입");
        String message = regiService.checkId(registerDto.getM_id());
        log.info(message);
        return message;
    }
}