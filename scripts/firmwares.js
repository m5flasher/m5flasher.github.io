const firmwaresContainer = document.getElementById("firmwares-container");
let unsupportedBrowserMessageShown = false;

 firmwares.forEach(firmware => {
      const section = document.createElement("section");
      section.classList.add("section-firm");

      const button = document.createElement("esp-web-install-button"); 
      button.setAttribute("manifest", firmware.manifest);

      const activateButton = document.createElement("button");
      activateButton.classList.add("firm");
      activateButton.setAttribute("slot", "activate");
      activateButton.textContent = `Прошивка ${firmware.name}`;
      button.appendChild(activateButton);

      const unsupportedSpan = document.createElement("span");
      unsupportedSpan.classList.add("unsupported"); // Добавляем класс для стилизации
      unsupportedSpan.setAttribute("slot", "unsupported");
      unsupportedSpan.textContent = "Ваш браузер не поддерживается! Поддерживаются только Chrome и Edge на ПК.";
      button.appendChild(unsupportedSpan);

      const notAllowedSpan = document.createElement("span");
      notAllowedSpan.setAttribute("slot", "not-allowed");
      notAllowedSpan.textContent = "Перейдите на m5flasher.ru!";
      button.appendChild(notAllowedSpan);

      // Проверка поддержки браузера (только один раз)
      if (!unsupportedBrowserMessageShown && !button.isSupported) {
        unsupportedSpan.style.display = "block";
        unsupportedBrowserMessageShown = true;
      } else if (!button.isSupported) {
        unsupportedSpan.style.display = "none";
      }

      section.appendChild(button);
      firmwaresContainer.appendChild(section);
    });