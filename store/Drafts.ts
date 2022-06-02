import localForage from 'localforage';
import type { ManualProps, EssentialProps, BrowserProps, ScreenProps, SectionProps, ComponentProps } from '@/types/Drafts';

export const Drafts = {
  async createManual(data: { project: string, title: string, version?: string }) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');

      localForage.setItem('draft', {
        ...draft,

        project: data.project,
        title: data.title,
        version: data.version,
        sections: [],
      });

      console.log('create:', data);

    } catch (e) {
      console.error(e);
    }
  },

  async setIntro(data: string) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

        console.log('draft:', draft);
        console.log('intro:', data);
        console.log('create:', { ...draft, intro: data });

      localForage.setItem('draft', {
        ...draft,
        intro: data,
      });

    } catch (e) {
      console.error(e);
    }
  },

  // async setEssential(data: EssentialProps) {
  //   try {
  //     const draft: ManualProps|null = await localForage.getItem('draft');
  //     if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

  //     localForage.setItem('draft', {
  //       ...draft,

  //       essential: data,
  //     });

  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
  async setEssentialBrowsers(data: Array<BrowserProps>) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      localForage.setItem('draft', {
        ...draft,

        essential: {
          ...draft.essential,
          browsers: data,
        },
      });

    } catch (e) {
      console.error(e);
    }
  },
  async setEssentialScreen(data: ScreenProps) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      localForage.setItem('draft', {
        ...draft,

        essential: {
          ...draft.essential,
          screen: data,
        },
      });

    } catch (e) {
      console.error(e);
    }
  },

  async addSection(data: SectionProps) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      const _sections = draft.sections;

      localForage.setItem('draft', {
        ...draft,
        sections: [ ..._sections, { ...data , components: [], }, ],
      });

    } catch (e) {
      console.error(e);
    }
  },

  async updateSection(target: SectionProps) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      if (!!target) {
        localForage.setItem('draft', {
          ...draft,
          sections: draft.sections?.map(section => section.id === target.id ? {...target} : {...section}),
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  async removeSection(id: string) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      const _sections = draft.sections;
      const index = _sections?.findIndex(section => section.id === id);

      if (index >= 0) {
        _sections.splice(index, 1);

        localForage.setItem('draft', {
          ...draft,
          sections: _sections,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  async addComponent(sectionId: string, data: ComponentProps ) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      const targetSection = draft.sections?.find(section => section.id === sectionId);

      if (!targetSection) {
        throw new Error(`섹션${sectionId} 정보를 찾을 수 없습니다.`);
      }

      // 섹션에 컴포넌트 추가
      targetSection.components.push(data);

      // 변경된 섹션 저장
      localForage.setItem('draft', {
        ...draft,
        sections: draft.sections.map(section => section.id === sectionId ? {...section} : {...targetSection}),
      });
    } catch (e) {
      console.error(e);
    }
  },
  async removeComponent(sectionId: string, id: string) {
    try {
      const draft: ManualProps|null = await localForage.getItem('draft');
      if (!draft) throw new Error('생성된 매뉴얼이 없습니다.');

      const targetSection = draft.sections.find(section => section.id === sectionId);

      if (!targetSection) {
        throw new Error(`섹션${sectionId} 정보를 찾을 수 없습니다.`);
      }

      const index = targetSection.components?.findIndex(component => component.id === id);

      if (index >= 0) {
        targetSection.components.splice(index, 1);

        localForage.setItem('draft', {
          ...draft,
          sections: draft.sections.map(section => section.id === sectionId ? {...section} : {...targetSection}),
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  saveDraft(data: ManualProps) {
    return localForage.setItem('draft', data);
  },

  async getDraft() {
    try {
      const data: ManualProps|null = await localForage.getItem('draft');
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default Drafts;
