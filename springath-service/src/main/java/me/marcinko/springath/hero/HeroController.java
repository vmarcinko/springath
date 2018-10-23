package me.marcinko.springath.hero;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/heroes")
public class HeroController implements InitializingBean {
	private final Logger LOG = LoggerFactory.getLogger(HeroController.class);

	private final HeroRepository heroRepository;

	public HeroController(final HeroRepository heroRepository) {
		LOG.info("Classpat hresource at: " + this.getClass().getResource("/static/index.html"));
		LOG.info("Classpat hresource at: " + this.getClass().getResourceAsStream("/static/index.html"));
		this.heroRepository = heroRepository;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		heroRepository.save(new Hero("Hardy", LocalDate.of(1978, 11, 2)));
		heroRepository.save(new Hero("Tom", LocalDate.of(1988, 11, 2)));
		heroRepository.save(new Hero("William H. Bony", LocalDate.of(1966, 4, 2)));
		heroRepository.save(new Hero("Mama Mia", LocalDate.of(1970, 11, 2)));
		heroRepository.save(new Hero("Napoleon", LocalDate.of(1978, 5, 2)));
	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Hero createHero(@RequestBody Hero hero) {
		LOG.info("createHero: {}", hero.getName());
		Hero createdHero = heroRepository.save(hero);
		LOG.info("Created hero {} with id {}", createdHero.getName(), createdHero.getId());
		return createdHero;
	}

	@GetMapping(produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody
	List<Hero> listHeroes() {
		LOG.info("List heroes");
		return heroRepository.findAll();
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody
	Hero getHeroById(@PathVariable Long id) {
		LOG.info("Get hero by id {}", id);
		return heroRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hero not found for id: " + id));
	}

	@PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateHero(@PathVariable Long id, @RequestBody Hero hero) {
		// Retrieve hero first. This is the only way to ensure hero already exists prior to saving.
		final Hero currentHero = heroRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hero not found for id: " + id));
		LOG.info("updateHero: modified name from {} to {}", currentHero.getName(), hero.getName());
		currentHero.setName(hero.getName());
		this.heroRepository.save(currentHero);
	}

	@DeleteMapping(value = "/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteHero(@PathVariable Long id) {
		LOG.info("delete >{}<", id);
		final Hero hero = heroRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hero not found for id: " + id));
		heroRepository.delete(hero);
	}

	@GetMapping(params = "name", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public List<Hero> findByName(@RequestParam("name") String name) {
		LOG.info("FindByName >{}<", name);
		return heroRepository.findByName(name);
	}
}
