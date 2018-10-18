const Command = require('../BaseCmd')
const Message = require('discord.js').Message // Used for JSDocs
// const Survey = require('survaid')
const Strings = require('../util/String').enUS.polls
const { isBetaTester } = require('../util/Config')

const actions = {
  create: 'create',
  vote: 'vote',
  list: 'list'
}

/**
 *
 * @param {String[]} args
 */
const determineAction = args => {
  switch (args[0].toLowerCase()) {
    case actions.create: return actions.create
    case actions.list: return actions.list
    case actions.vote: return actions.vote

    default: return undefined
  }
}

class Poll extends Command {
  constructor (client) {
    super(client, {
      name: 'poll',
      group: 'features',
      memberName: 'poll',
      throttling: { usages: 1, duration: 10 },
      description: 'Allows you to create your own polls or vote in existing ones.',
      guildOnly: true,
      aliases: ['polls', 'survey', 'surveys'],
      argsType: 'multiple'
    })
  }

  /**
   * Steps to get a proper poll setup:
   *
   * 1) Get responses to the needed fields:
   *  - Title/Label/Question
   *  - Start Time of Poll
   *  - End Time of Poll
   *  - Is any input allowed or are there prefilled options?
   *    - If there are options to choose from, get the options
   *  - Can users vote more than once?
   * 2) Store that data and announce the poll is available.
   * 3) Enable other users to vote on the survey if they're in the same server.
   *
   * @param {Message} msg
   * @param {String[]} [args]
   *
   * @returns {Promise<Message>}
   */
  async run (msg, args) {
    if (isBetaTester(msg.author.id)) {
    // See if the user wishes to vote, or create a poll
      switch (args.length) {
        case 0: return msg.reply(Strings.noArgs)

        case 1: {
          switch (determineAction(args)) {
            case actions.create: {
              // Get the necessary fields from the user and create a poll
              await msg.reply('What is the question or title of this poll?')
              Command.getResponse(msg, val => val.length > 0, msg.author.id).then(response => {
                msg.reply(`your response was ${response}`)
              })
              break
            }

            case actions.vote: {
              // Get the survey they want to vote on and what they wanted to vote
              break
            }

            case actions.list: {
              // List the available surveys on the given server
              break
            }
          }
        }
      }
    } else return msg.reply('this command is currently under development and is not publicly available.')

    // if (msg.author.id === getSetting('owner')) {
    //   let survey = new Survey({
    //     allowMultiple: true,
    //     anyInput: true,
    //     startTime: '01/30/2018-08:00',
    //     endTime: '01/31/2018-08:00',
    //     label: 'What would you like to do next week?'
    //   })

    //   survey.vote('Test 1', 123).then(res => {
    //     survey.vote('Test 1', 123).then(res => {
    //       survey.vote('Test 1', 123, true).then(res => {
    //         msg.channel.send(survey.values)
    //       }).catch(err => this.log(err))
    //     }).catch(err => this.log(err))
    //   }).catch(err => this.log(err))
    // } else return msg.reply('this command is currently under development and is not publicly available.')
  }
}

module.exports = Poll
