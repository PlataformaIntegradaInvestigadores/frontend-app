import { Component } from '@angular/core';

@Component({
  selector: 'msg-onboarding',
  templateUrl: './msg-onboarding.component.html',
  styleUrls: ['./msg-onboarding.component.css']
})
export class MsgOnboardingComponent {
  showModalOnboarding = true;
  currentIndexToModalOfOnboarding = 0;

  messages = [
    "In this initial phase, please explore the assigned research topics and share your experiences. Additionally, if you have a specific interest, feel free to propose a new research topic.",
    "In this phase, you will be able to categorize each topic based on predefined tags. Additionally, you can prioritize research topics according to your interests, with the highest position reserved for the topic that interests you the most.",
    "In the final phase, you will be able to observe the results of the consensus. The most suitable topics for the group will be displayed on a podium, based on their interaction."
  ];

  images = [
    `assets/onbording_concensus/uno.png`,
    `assets/onbording_concensus/dos.png`,
    `assets/onbording_concensus/tres.png`
  ];

  get currentMessage() {
    return this.messages[this.currentIndexToModalOfOnboarding];
  }

  get currentImage() {
    return this.images[this.currentIndexToModalOfOnboarding];
  }

  nextMessage() {
    if (this.currentIndexToModalOfOnboarding < this.messages.length - 1) {
      this.currentIndexToModalOfOnboarding++;
    }
  }

  previousMessage() {
    if (this.currentIndexToModalOfOnboarding > 0) {
      this.currentIndexToModalOfOnboarding--;
    }
  }

  closeModalOnboarding() {
    this.showModalOnboarding = false;
  }

  nextOrClose() {
    if (this.currentIndexToModalOfOnboarding < this.messages.length - 1) {
      this.nextMessage();
    } else {
      this.closeModalOnboarding();
    }
  }
}
