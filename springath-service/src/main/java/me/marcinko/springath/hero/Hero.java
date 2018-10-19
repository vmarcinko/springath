package me.marcinko.springath.hero;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Hero {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;

	private LocalDate birthday;

	public Hero() {
	}

	public Hero(final String name, final LocalDate birthday) {
		this.name = name;
		this.birthday = birthday;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(final LocalDate birthday) {
		this.birthday = birthday;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("Hero{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append(", birthday=").append(birthday);
		sb.append('}');
		return sb.toString();
	}
}