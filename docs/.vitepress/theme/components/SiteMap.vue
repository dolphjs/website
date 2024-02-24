<script setup lang="ts">
  import { useData } from "vitepress";

  const data = useData();
  const nav = data.site.value.themeConfig.nav;
</script>
