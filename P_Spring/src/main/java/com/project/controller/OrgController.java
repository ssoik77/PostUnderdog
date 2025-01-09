package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/org")
public class OrgController {

    @Autowired
    private OrgService orgService;

    @GetMapping("/getExecutives")
    public List<Employee> getExecutives() {
        return orgService.getExecutives();
    }
}
