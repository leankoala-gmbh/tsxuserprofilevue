<script setup lang='ts'>

const cleverBridgeLinks = useCbLinks().getLinks()

</script>

<template>
  <div class="text-xs cleverBridgeInfo">
    <h3 class="font-medium text-sm mb-2">
      Confirm subscription
    </h3>
    <p class="mb-2">
      By submitting this order, you agree that you are signing up for a subscription product that will be billed in regular intervals. Continued use of the purchased product is contingent upon your payment of the subscription. Details about the price and frequency of the billing appear in the above shopping cart.
    </p>
    <p class="mb-2">
      © cleverbridge AG 2023
    </p>
    <p>
      This order process is conducted by our online reseller cleverbridge AG.<br>
      Payment processing and order fulfillment are done by cleverbridge AG, Gereonstr. 43-65, 50670 Cologne, Germany.
    </p>
    <div
      class="mt-2 flex flex-wrap text-xs justify-between gap-4"
    >
      <div
        v-for="link , i in cleverBridgeLinks"
        :key="i"
      >
        <a
          target="_blank"
          :href="link.url"
          class="contents"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </div>
</template>
