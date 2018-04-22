# frozen_string_literal: true

# app/serializers/qc_serializer.rb
class QcSerializer < ActiveModel::Serializer
  # rubocop:disable Layout/EmptyLinesAroundArguments
  attributes :id, :player_id, :chronicle_id,
             :hidden, :pinned, :sort_order, :chronicle_sort_order, :public,
             :name, :essence, :description, :type,
             :willpower_temporary, :willpower_permanent,
             :health_level_0s, :health_level_1s, :health_level_2s,
             :health_level_4s, :health_level_incap,
             :damage_bashing, :damage_lethal, :damage_aggravated,

             :motes_personal_current,   :motes_personal_total,
             :motes_peripheral_current, :motes_peripheral_total,
             :motes_committed,
             :anima_level, :excellency,

             :movement, :appearance, :resolve, :guile, :evasion, :parry,
             :armor_name, :soak, :hardness, :join_battle,

             :actions, :senses, :grapple, :grapple_control,

             :ties, :principles,

             :initiative, :onslaught, :in_combat, :has_acted
  # rubocop:enable Layout/EmptyLinesAroundArguments

  has_many :qc_attacks
  has_many :qc_charms
  has_many :qc_merits
end
