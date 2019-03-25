package com.service;

import java.util.ArrayList;
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
	public void add(Users s) {
		ud.add(s);
	}

	// 修改
	public void upd(Users s) {
		ud.upd(s);
	}

	// 删除
	public void del(Integer u_id) {
		ud.del(u_id);
	}

	// 查询所有
	public List<Users> queryAll() {
		return ud.queryAll();
	}

	// 分页查询
	public List<Users> queryPage(Integer page, Integer limit) {
		return ud.queryPage(page, limit);
	}

	// 登陆
	public List<Users> queryByName(String uname, String pwd) {
		return ud.queryByName(uname, pwd);
	}

	// 查询所有认证导师信息
	public List<Users> queryByTeacher(Integer u_teacher) {
		return ud.queryByTeacher(u_teacher);
	}

	// 查询所有VIP用户
	public List<Users> queryByVIP(Integer u_vip) {
		return ud.queryByVIP(u_vip);
	}

	//
	public Users queryLog(String uname) {
		return ud.queryLog(uname);
	}

	// 根据编号查询用户是否是VIP
	public List<Users> queryVipById(String u_id) {
		return ud.queryVipById(u_id);
	}

	private List<Users> users = new ArrayList<Users>();

	private int len = 0;

	/**
	 * 判断用户是否存在用户名
	 * 
	 * @param userName
	 * @return
	 */
	public boolean checkUserName(String userName) {
		if (len == 0) {
			users = queryAll();
			len = users.size();
		}
		for (Users user : users) {
			if (user.getU_phone().equals(userName)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 根据用户查询用户密码
	 * 
	 * @param userName
	 * @return
	 */
	public String getPassword(String userName) {
		for (Users user : users) {
			if (user.getU_phone().equals(userName)) {
				return user.getU_pwd();
			}
		}
		return "";
	}

}
