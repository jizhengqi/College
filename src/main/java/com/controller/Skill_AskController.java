package com.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Skill_Ask;
import com.service.Skill_AskService;

@Controller
@RequestMapping("skill_ask")
public class Skill_AskController {
	
	@Resource
	Skill_AskService ss;
	
	Integer rs;
	
	// 添加技术问答
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Skill_Ask sa){
		ss.add(sa);
		rs = 1;
		return rs;
	}
	
	// 分页查询所有的技术问答信息
	@RequestMapping("queryByPage")
	@ResponseBody
	public List<Skill_Ask> queryByPage(Integer page,Integer limit){
		if(null == page){
			page = 1;
		}
		if(null == limit){
			limit = 10;
		}
		return ss.queryByPage((page-1)*limit, limit);
	}
}
