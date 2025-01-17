/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
// biome-ignore lint: disable
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const checkBetweenLength: typeof import('./src/utils/index')['checkBetweenLength']
  const clamp: typeof import('./src/utils/index')['clamp']
  const closestNumber: typeof import('./src/utils/index')['closestNumber']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const debugEcho: typeof import('./src/utils/debugHelper')['debugEcho']
  const deepMerge: typeof import('./src/utils/index')['deepMerge']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const effectScope: typeof import('vue')['effectScope']
  const equal: typeof import('./src/utils/index')['equal']
  const findKeyInObj: typeof import('./src/utils/index')['findKeyInObj']
  const flattenObj: typeof import('./src/utils/index')['flattenObj']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getLanguage: typeof import('./src/composables/translateHelper')['getLanguage']
  const groupBy: typeof import('./src/utils/index')['groupBy']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isBoolean: typeof import('./src/utils/index')['isBoolean']
  const isNull: typeof import('./src/utils/index')['isNull']
  const isNumber: typeof import('./src/utils/index')['isNumber']
  const isObject: typeof import('./src/utils/index')['isObject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const isString: typeof import('./src/utils/index')['isString']
  const last: typeof import('./src/utils/index')['last']
  const lastProperty: typeof import('./src/utils/index')['lastProperty']
  const markRaw: typeof import('vue')['markRaw']
  const nextTick: typeof import('vue')['nextTick']
  const objGetKeyByValue: typeof import('./src/utils/index')['objGetKeyByValue']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const onWatcherCleanup: typeof import('vue')['onWatcherCleanup']
  const oneOf: typeof import('./src/utils/index')['oneOf']
  const prop: typeof import('./src/utils/index')['prop']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const removeById: typeof import('./src/utils/index')['removeById']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const resolveDirective: typeof import('vue')['resolveDirective']
  const setLanguage: typeof import('./src/composables/translateHelper')['setLanguage']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const some: typeof import('./src/utils/index')['some']
  const t: typeof import('./src/composables/translateHelper')['t']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useApiAbstraction: typeof import('./src/composables/apiAbstraction/apiAbstraction')['useApiAbstraction']
  const useAttrs: typeof import('vue')['useAttrs']
  const useBoxRouteQuery: typeof import('./src/composables/boxRouteQuery/boxRouteQuery')['useBoxRouteQuery']
  const useCbLinks: typeof import('./src/composables/cbLinks/cbLinks')['useCbLinks']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useId: typeof import('vue')['useId']
  const useLocalHelper: typeof import('./src/composables/localHelper/localHelper')['useLocalHelper']
  const useModel: typeof import('vue')['useModel']
  const useSlots: typeof import('vue')['useSlots']
  const useTemplateRef: typeof import('vue')['useTemplateRef']
  const useTextHelper: typeof import('./src/composables/textHelper/textHelper')['useTextHelper']
  const validateBetweenLength: typeof import('./src/utils/formValidators')['validateBetweenLength']
  const validateEmail: typeof import('./src/utils/formValidators')['validateEmail']
  const validateMaxLength: typeof import('./src/utils/formValidators')['validateMaxLength']
  const validateMinLength: typeof import('./src/utils/formValidators')['validateMinLength']
  const validatePasswordQuality: typeof import('./src/utils/formValidators')['validatePasswordQuality']
  const validateUrl: typeof import('./src/utils/formValidators')['validateUrl']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, DirectiveBinding, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, MaybeRef, MaybeRefOrGetter, VNode, WritableComputedRef } from 'vue'
  import('vue')
}

// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface GlobalComponents {}
  interface ComponentCustomProperties {
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly checkBetweenLength: UnwrapRef<typeof import('./src/utils/index')['checkBetweenLength']>
    readonly clamp: UnwrapRef<typeof import('./src/utils/index')['clamp']>
    readonly closestNumber: UnwrapRef<typeof import('./src/utils/index')['closestNumber']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly debugEcho: UnwrapRef<typeof import('./src/utils/debugHelper')['debugEcho']>
    readonly deepMerge: UnwrapRef<typeof import('./src/utils/index')['deepMerge']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly equal: UnwrapRef<typeof import('./src/utils/index')['equal']>
    readonly findKeyInObj: UnwrapRef<typeof import('./src/utils/index')['findKeyInObj']>
    readonly flattenObj: UnwrapRef<typeof import('./src/utils/index')['flattenObj']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly getLanguage: UnwrapRef<typeof import('./src/composables/translateHelper')['getLanguage']>
    readonly groupBy: UnwrapRef<typeof import('./src/utils/index')['groupBy']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isBoolean: UnwrapRef<typeof import('./src/utils/index')['isBoolean']>
    readonly isNull: UnwrapRef<typeof import('./src/utils/index')['isNull']>
    readonly isNumber: UnwrapRef<typeof import('./src/utils/index')['isNumber']>
    readonly isObject: UnwrapRef<typeof import('./src/utils/index')['isObject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly isString: UnwrapRef<typeof import('./src/utils/index')['isString']>
    readonly last: UnwrapRef<typeof import('./src/utils/index')['last']>
    readonly lastProperty: UnwrapRef<typeof import('./src/utils/index')['lastProperty']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly objGetKeyByValue: UnwrapRef<typeof import('./src/utils/index')['objGetKeyByValue']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly onWatcherCleanup: UnwrapRef<typeof import('vue')['onWatcherCleanup']>
    readonly oneOf: UnwrapRef<typeof import('./src/utils/index')['oneOf']>
    readonly prop: UnwrapRef<typeof import('./src/utils/index')['prop']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly removeById: UnwrapRef<typeof import('./src/utils/index')['removeById']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly setLanguage: UnwrapRef<typeof import('./src/composables/translateHelper')['setLanguage']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly some: UnwrapRef<typeof import('./src/utils/index')['some']>
    readonly t: UnwrapRef<typeof import('./src/composables/translateHelper')['t']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly toValue: UnwrapRef<typeof import('vue')['toValue']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useApiAbstraction: UnwrapRef<typeof import('./src/composables/apiAbstraction/apiAbstraction')['useApiAbstraction']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useBoxRouteQuery: UnwrapRef<typeof import('./src/composables/boxRouteQuery/boxRouteQuery')['useBoxRouteQuery']>
    readonly useCbLinks: UnwrapRef<typeof import('./src/composables/cbLinks/cbLinks')['useCbLinks']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useId: UnwrapRef<typeof import('vue')['useId']>
    readonly useLocalHelper: UnwrapRef<typeof import('./src/composables/localHelper/localHelper')['useLocalHelper']>
    readonly useModel: UnwrapRef<typeof import('vue')['useModel']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly useTemplateRef: UnwrapRef<typeof import('vue')['useTemplateRef']>
    readonly useTextHelper: UnwrapRef<typeof import('./src/composables/textHelper/textHelper')['useTextHelper']>
    readonly validateBetweenLength: UnwrapRef<typeof import('./src/utils/formValidators')['validateBetweenLength']>
    readonly validateEmail: UnwrapRef<typeof import('./src/utils/formValidators')['validateEmail']>
    readonly validateMaxLength: UnwrapRef<typeof import('./src/utils/formValidators')['validateMaxLength']>
    readonly validateMinLength: UnwrapRef<typeof import('./src/utils/formValidators')['validateMinLength']>
    readonly validatePasswordQuality: UnwrapRef<typeof import('./src/utils/formValidators')['validatePasswordQuality']>
    readonly validateUrl: UnwrapRef<typeof import('./src/utils/formValidators')['validateUrl']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}