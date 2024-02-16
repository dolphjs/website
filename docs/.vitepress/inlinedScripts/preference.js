(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved ? saved !== "false" : def) {
      document.documentElement.classList.add(cls);
    }
  };
  restore("dolph-docs-prefer-spring", "prefer-spring", true);
  restore("dolph-docs-prefer-express", "prefer-express", true);
})();
