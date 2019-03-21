package com.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Collect;
import com.service.CollectService;

@Controller
@RequestMapping("collect")
public class CollectController {
	
	@Resource
	CollectService cs;
	
	Integer rs;
	
	// 查询当前用户是否关注了当前课程,如果没有则关注,有的话取消关注
	@RequestMapping("queryByCollect")
	@ResponseBody
	public Integer queryByCollect(Integer u_id,Integer c_id,Integer v_id){
		List<Collect> list = cs.queryByCollect(u_id, c_id, v_id);
		if(list.size() > 0){
			cs.del(u_id, c_id, v_id);
			rs = 1;
		}else{
			cs.add(u_id, c_id, v_id);
			rs = 2;
		}
		return rs;
	}
	
}
