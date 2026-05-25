<script setup lang="ts">
	import { ColorPicker as ArkColorPicker } from '@ark-ui/vue/color-picker';
</script>
<template>
	<ArkColorPicker.Content class="ColorPicker_Content">
		<ArkColorPicker.Area class="ColorPicker_Area">
			<ArkColorPicker.AreaBackground class="ColorPicker_AreaBackground" />
			<ArkColorPicker.AreaThumb class="ColorPicker_AreaThumb" />
		</ArkColorPicker.Area>
		<div class="ColorPicker_SliderGroup">
			<div class="ColorPicker_ChannelSliders">
				<ArkColorPicker.ChannelSlider
					channel="hue"
					class="ColorPicker_ChannelSlider"
				>
					<ArkColorPicker.ChannelSliderTrack class="ColorPicker_ChannelSliderTrack" />
					<ArkColorPicker.ChannelSliderThumb class="ColorPicker_ChannelSliderThumb" />
				</ArkColorPicker.ChannelSlider>
				<ArkColorPicker.ChannelSlider
					channel="alpha"
					class="ColorPicker_ChannelSlider"
				>
					<ArkColorPicker.TransparencyGrid class="ColorPicker_TransparencyGrid" />
					<ArkColorPicker.ChannelSliderTrack class="ColorPicker_ChannelSliderTrack" />
					<ArkColorPicker.ChannelSliderThumb class="ColorPicker_ChannelSliderThumb" />
				</ArkColorPicker.ChannelSlider>
			</div>
		</div>
	</ArkColorPicker.Content>
</template>
