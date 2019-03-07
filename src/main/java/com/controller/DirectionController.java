package com.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Direction;
import com.service.DirectionService;

@Controller
@RequestMapping("direction")
public class DirectionController {
	
	@Resource
	DirectionService ds;
	
	@RequestMapping("queryAll")
	@ResponseBody
	public List<Direction> queryAll(){
		List<Direction> list = ds.queryAll();
		return list;
	}
}
