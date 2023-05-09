import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import index from "../pages/index.vue";

describe("Index Page", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(index);
    expect(wrapper.text()).toContain("註冊");
  });
});
