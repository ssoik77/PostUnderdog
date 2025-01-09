package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrgService {

    @Autowired
    private OrgRepository orgRepository;

    public List<Employee> getExecutives() {
        return orgRepository.findExecutives();
    }
}