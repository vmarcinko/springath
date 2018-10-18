package me.marcinko.springath.hero;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HeroRepository extends JpaRepository<Hero, Long> {

	@Query("select h from me.marcinko.springath.hero.Hero h where lower(h.name) like CONCAT('%', lower(:contains), '%')")
	List<Hero> findByName(@Param("contains") String name);
}
