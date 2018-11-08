<template>
  <div class="GHeader">
    <div class="GHeader-container container">
      <a :href="titleLink" class="GHeader-logo">{{ title }}</a>
      <div class="GHeader-linkBlock">
        <div class="GHeader-linkGroup"
          v-for="link in headerLinks"
          :key="link.title"
        >
          <span class="GHeader-linkGroupTitle">{{ link.title }}</span>
          <div class="GHeader-linkList">
            <a class="GHeader-linkItem"
              v-for="item in link.items"
              :key="item.title"
              :href="item.href"
            >{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

export interface IHeaderLink {
  title: string;
  items: IHeaderLinkItem[];
}

export interface IHeaderLinkItem {
  title: string;
  href: string;
}

@Component({})
export default class GHeader extends Vue {
  @Prop() protected title!: string;
  @Prop({ default: '/' }) protected titleLink!: string;
  @Prop({ default: () => [] }) protected headerLinks!: IHeaderLink[];
}
</script>

<style>
.GHeader {
  background-color: var(--GHeader-color-bg);
  box-sizing: border-box;
  color: var(--GHeader-color-fg);
  font-size: 0.8rem;
  height: var(--GHeader-height);
  line-height: var(--GHeader-height);
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.GHeader a {
  color: inherit;
  text-decoration: none;
}

.GHeader a:hover {
  text-decoration: underline;
}

.GHeader-container {
  justify-content: space-between;
  display: flex;
  padding: 0 1rem;
}

.GHeader-linkBlock {
  align-items: flex-start;
  cursor: default;
  display: flex;
}

.GHeader-linkGroup {
  background-color: var(--GHeader-color-bg);
  margin-left: 0em;
  padding: 0 1px;
  position: relative;
}

.GHeader-linkGroup:hover {
  border: 1px var(--GHeader-color-border);
  border-style: solid solid none;
  padding: 0;
}

.GHeader-linkGroupTitle {
  padding: 0 0.5em;
}

.GHeader-linkList {
  background-color: var(--GHeader-color-bg);
  box-shadow: 0 0 20px #0006;
  height: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  right: -1px;
  top: calc(1.4em - 1px);
  transition: opacity 200ms;
  min-width: 5em;
  z-index: -1;
}

.GHeader-linkGroup:hover .GHeader-linkList {
  border: 1px solid var(--GHeader-color-border);
  height: auto;
  opacity: 1;
  padding-top: 0.5em;
  transition: opacity 0s;
}

.GHeader-linkItem {
  display: block;
  padding: 0.4em 1em;
  white-space: nowrap;
}
</style>
