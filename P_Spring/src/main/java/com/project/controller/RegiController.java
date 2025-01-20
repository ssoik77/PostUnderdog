package com.project.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.RegiService;

import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "http://localhost:3000") // React와의 CORS 허용
@RestController
@RequestMapping(value = "/register/*", produces = "application/text; charset=utf8")
@Log4j
public class RegiController {

    private final RegiService regiService;

    public RegiController(RegiService regiService) {
        this.regiService = regiService;
    }

    @PostMapping("/set")
    public void setRegister(@RequestBody RegisterDto registerDto) {
        regiService.setRegister(registerDto);
    }

    @PostMapping("/id/check")
    public String checkId(@RequestBody RegisterDto registerDto) {
        String message = regiService.checkId(registerDto.getM_id());
        return message;
    }
}