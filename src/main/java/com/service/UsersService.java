package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.UsersDao;
import com.entity.Users;

@Service
@Transactional
public class UsersService {
	
	@Resource
	UsersDao ud;
	
	// 注册
	public void add(Users s){
		ud.add(s);
	}
	
	// 修改
	public void upd(Users s){
		ud.upd(s);
	}
	
	// 删除
	public void del(Integer u_id){
		ud.del(u_id);
	}
	
	// 查询所有
	public List<Users> queryAll(){
		return ud.queryAll();
	}
	
	// 分页查询
	public List<Users> queryPage(Integer page,Integer limit){
		return ud.queryPage(page, limit);
	}
	
	// 登陆
	public List<Users> queryByName(String uname,String pwd){
		return ud.queryByName(uname,pwd);
	}
}
