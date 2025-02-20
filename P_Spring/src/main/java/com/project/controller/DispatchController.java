package com.project.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dispatch")
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.0.135:3000"})
public class DispatchController {

}
