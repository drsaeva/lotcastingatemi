# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  before_validation :trim_tags
  before_validation :set_traits_for_elemental_bolt

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: Constants::ATTRIBUTES }
  validates :damage_attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }

  def trim_tags
    return unless will_save_change_to_attribute? :tags

    self.tags = tags.reject(&:blank?).collect(&:strip).collect(&:downcase).uniq
  end

  def set_traits_for_elemental_bolt
    return unless will_save_change_to_attribute? :tags

    return unless tags.include?('elemental bolt') && !(tags_was.include? 'elemental bolt')

    self.damage_attr = 'essence'
    self.is_artifact = true
  end

  def entity_type
    'weapon'
  end
  alias_attribute :entity_assoc, :entity_type
end
